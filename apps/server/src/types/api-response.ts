export type ApiResponse = {
    status: "status" | "error";
    message?: string;
    response?: any;
};
