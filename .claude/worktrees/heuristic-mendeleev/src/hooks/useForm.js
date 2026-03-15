import { useState, useCallback } from 'react';

/**
 * Reusable Form Hook
 * Handles form state, validation, and submission for all forms
 * Eliminates duplicate form handling code across Contact and BookNow pages
 */

export const useForm = (initialValues, onSubmit, validationRules = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: false, message: '' });

  // Handle input change
  const handleChange = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  }, [errors]);

  // Handle event-based change (for traditional inputs)
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  }, [handleChange]);

  // Validate form
  const validate = useCallback(() => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = formData[field];

      if (rules.required && !value) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field] = 'Please enter a valid email';
      } else if (rules.phone && value && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(value)) {
        newErrors[field] = 'Please enter a valid phone number';
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = `Must be at least ${rules.minLength} characters`;
      } else if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Invalid format';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();

    // Validate before submitting
    if (!validate()) {
      setSubmitStatus({ 
        success: false, 
        error: true, 
        message: 'Please fix the errors in the form' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: '' });

    try {
      const result = await onSubmit(formData);
      
      setSubmitStatus({ 
        success: true, 
        error: false, 
        message: result.message || 'Success!' 
      });

      // Reset form after successful submission
      setTimeout(() => {
        setFormData(initialValues);
        setSubmitStatus({ success: false, error: false, message: '' });
      }, 3000);

    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        error: true, 
        message: error.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, initialValues, onSubmit, validate]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setSubmitStatus({ success: false, error: false, message: '' });
  }, [initialValues]);

  // Set multiple fields at once
  const setFields = useCallback((fields) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleInputChange,
    handleSubmit,
    resetForm,
    setFields,
    setFormData,
  };
};

export default useForm;
