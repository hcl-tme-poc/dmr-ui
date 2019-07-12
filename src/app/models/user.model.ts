export interface UserModel {
    firstName: string; 
    lastName: string;
    email: string;
    token: string;
    driverLicenseNumber: string;
    trilliumNumber: string;
    postalCode: string;
    dob: string;
}


export interface UserEligibilityState { 
    firstName: string, 
    lastName: string, 
    email: string, 
    driverLicenseNumber: string, 
    trilliumNumber: string, 
    postalCode: string, 
    dob: string, 
    pricheck: string | boolean
}