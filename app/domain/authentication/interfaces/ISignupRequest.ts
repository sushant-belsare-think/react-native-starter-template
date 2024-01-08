export interface ISignupRequest {
    firstName: string 
    lastName: string,
    userName: string,
    password: string,
    businessType? : string,
    businessName? : string
}