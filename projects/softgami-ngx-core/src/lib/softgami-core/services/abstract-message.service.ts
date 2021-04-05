export abstract class AbstractMessageService {

    abstract error(message?: string): void;
    abstract info(message?: string): void;
    abstract success(message?: string): void;
    abstract warning(message?: string): void;

}
