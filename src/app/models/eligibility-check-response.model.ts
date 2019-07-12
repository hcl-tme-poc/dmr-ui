export interface EligibilityCheckResponse {
    message: string;
    reasons?: {reasonName: string; reasonDescription: string}[];
}
