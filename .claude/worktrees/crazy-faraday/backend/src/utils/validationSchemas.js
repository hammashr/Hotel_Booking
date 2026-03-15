const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId');

const dateStringSchema = z
  .string()
  .datetime({ offset: true })
  .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD date string'));

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(150)
  .regex(/^[a-z0-9-]+$/, 'Slug must use lowercase letters, numbers, and hyphens');

const houseSlugParamsSchema = z.object({
  params: z.object({
    slug: slugSchema,
  }),
});

const bookingIdParamsSchema = z.object({
  params: z.object({
    bookingId: z.string().trim().min(1).max(50),
  }),
});

const checkAvailabilitySchema = z
  .object({
    body: z
      .object({
        houseId: objectIdSchema.optional(),
        houseSlug: slugSchema.optional(),
        slug: slugSchema.optional(),
        checkIn: dateStringSchema,
        checkOut: dateStringSchema,
        packageCode: z.enum(['standard']).optional(),
      })
      .superRefine((value, ctx) => {
        if (!value.houseId && !value.slug && !value.houseSlug) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['houseId'],
            message: 'Either houseId or houseSlug is required',
          });
        }
      }),
  })
  .superRefine((value, ctx) => {
    const checkIn = new Date(value.body.checkIn);
    const checkOut = new Date(value.body.checkOut);

    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
      return;
    }

    if (checkIn >= checkOut) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['body', 'checkOut'],
        message: 'checkOut must be after checkIn',
      });
    }
  });

const createBookingSchema = z
  .object({
    body: z.object({
      houseId: objectIdSchema.optional(),
      houseSlug: slugSchema.optional(),
      packageId: objectIdSchema.optional(),
      packageCode: z.enum(['standard']).optional(),
      guest: z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(200),
        phone: z.string().trim().min(4).max(40),
        country: z.string().trim().min(1).max(100),
        nationality: z.string().trim().min(1).max(100),
      }),
      stay: z.object({
        checkIn: dateStringSchema,
        checkOut: dateStringSchema,
        guests: z.number().int().min(1),
      }),
      preferences: z
        .object({
          unitType: z.string().trim().max(100).optional(),
          viewType: z.string().trim().max(100).optional(),
          addOns: z.array(z.enum(['horse-riding', 'atv'])).max(10).optional(),
          notes: z.string().trim().max(2000).optional(),
        })
        .optional(),
      pricing: z.object({
        subtotal: z.number().min(0),
        addOnsFee: z.number().min(0).default(0),
        cleaningFee: z.number().min(0).default(0),
        tax: z.number().min(0).default(0),
        taxRate: z.number().min(0).max(1).default(0),
        cancellationPolicy: z.string().trim().max(500).optional(),
        total: z.number().min(0),
      }),
    }),
  })
  .superRefine((value, ctx) => {
    const payload = value.body;

    if (!payload.houseId && !payload.houseSlug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['body', 'houseId'],
        message: 'Either houseId or houseSlug is required',
      });
    }

    if (!payload.packageId && !payload.packageCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['body', 'packageId'],
        message: 'Either packageId or packageCode is required',
      });
    }

    const checkIn = new Date(payload.stay.checkIn);
    const checkOut = new Date(payload.stay.checkOut);

    if (checkIn >= checkOut) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['body', 'stay', 'checkOut'],
        message: 'checkOut must be after checkIn',
      });
    }
  });

const pricePreviewSchema = z.object({
  body: z
    .object({
      houseId: objectIdSchema.optional(),
      houseSlug: slugSchema.optional(),
      slug: slugSchema.optional(),
      checkIn: dateStringSchema,
      checkOut: dateStringSchema,
      addOns: z.array(z.enum(['horse-riding', 'atv'])).max(10).optional(),
    })
    .superRefine((value, ctx) => {
      if (!value.houseId && !value.slug && !value.houseSlug) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['houseId'],
          message: 'Either houseId or houseSlug is required',
        });
      }
    }),
}).superRefine((value, ctx) => {
  const checkIn = new Date(value.body.checkIn);
  const checkOut = new Date(value.body.checkOut);
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) return;
  if (checkIn >= checkOut) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['body', 'checkOut'],
      message: 'checkOut must be after checkIn',
    });
  }
});

module.exports = {
  houseSlugParamsSchema,
  bookingIdParamsSchema,
  checkAvailabilitySchema,
  pricePreviewSchema,
  createBookingSchema,
};
