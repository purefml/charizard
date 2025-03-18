interface Referral {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    street: string;
    suburb: string;
    state: string;
    postal: string;
    country: string;
    avatar?: string;
  }
  
export const fieldAliases: Partial<Record<keyof Referral, string>> = {
    firstName: "Given Name",
    lastName: "Surname",
    email: "Email Address",
    phone: "Contact Number",
    address: "Address",
    street: "Street",
    suburb: "Suburb",
    state: "State",
    postal: "Postal Code",
    country: "Country",
    avatar: "Avatar", // Not required
  };