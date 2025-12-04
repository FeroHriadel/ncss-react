export function useForm() {
  
  function hasValue(element: Element): element is Element & { value: unknown } {
    return 'value' in element;
  }
  
  // Retrieves form values as an object given a form id (including custom ncss components like MultiSelect, Select)
  function getFormValues(formId: string): Record<string, string | boolean | string[] | FileList> {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      console.error(`Form with id "${formId}" not found`);
      return {};
    }
    const formData: Record<string, string | boolean | string[] | FileList> = {};
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      if (element.name) {
        // Handle file inputs - return FileList
        if (element instanceof HTMLInputElement && element.type === 'file') {
          if (element.files) {
            formData[element.name] = element.files;
          }
        }
        // Handle checkboxes - use checked property instead of value
        else if (element instanceof HTMLInputElement && element.type === 'checkbox') {
          formData[element.name] = element.checked;
        }
        // Handle radio buttons
        else if (element instanceof HTMLInputElement && element.type === 'radio') {
          if (element.checked) {
            formData[element.name] = element.value;
          }
        }
        // Handle multi-selects and custom components that attach value to DOM (like Select, MultiSelect)
        else if (hasValue(element) && element.value !== undefined) {
          formData[element.name] = element.value;
        }
        // Handle regular inputs
        else {
          formData[element.name] = element.value;
        }
      }
    }
    return formData;
  }

  // Is value a valid email format
  function isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function isPasswordCompliant(params: {
    value: string, 
    upperCase: boolean, 
    lowerCase: boolean, 
    number: boolean, 
    specialChar: boolean,
    minLength: number
  }): boolean {
    const { value, upperCase, lowerCase, number, specialChar, minLength } = params;
    let pattern = '^';
    if (upperCase) pattern += '(?=.*[A-Z])';
    if (lowerCase) pattern += '(?=.*[a-z])';
    if (number) pattern += '(?=.*[0-9])';
    if (specialChar) pattern += '(?=.*[!@#$%^&*])';
    pattern += `.{${
      minLength
    },}$`;
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  return { getFormValues, isEmail, isPasswordCompliant };
}