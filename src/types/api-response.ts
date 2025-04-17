export type ApiResponse = {
    status: "status" | "error";
    message?: string;
    content?: any;
};
