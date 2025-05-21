import { KiotVietService } from '../service/kiotviet_service';

export interface ToolStrategy {
  execute(args: any, service: KiotVietService): Promise<any>;
  validateArgs(args: any): void;
}