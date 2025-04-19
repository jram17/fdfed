export type ApiResponse = {
    status: "success" | "error";
    message?: string;
    content?: any;
};
