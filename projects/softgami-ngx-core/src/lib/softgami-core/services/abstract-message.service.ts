export abstract class AbstractMessageService {
    constructor(...args: any[]) {}
    abstract error(message?: string): void;
    abstract info(message?: string): void;
    abstract success(message?: string): void;
    abstract warning(message?: string): void;
}
