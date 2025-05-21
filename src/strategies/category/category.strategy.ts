import { KiotVietService } from '../../service/kiotviet_service';
import { ToolStrategy } from '../tool.strategy';

export class GetCategoriesStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getCategories(args);
  }

  validateArgs(args: any): void {
  }
}
export class GetCategoryByIdStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getCategoryById(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}
export class CreateCategoryStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.createCategory(args.data);
  }

  validateArgs(args: any): void {
    if (!args.data) {
      throw new Error("Missing required argument: data");
    }
  }
}
export class UpdateCategoryStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.updateCategory(String(args.id), args.data);
  }

  validateArgs(args: any): void {
    if (!args.id || !args.data) {
      throw new Error("Missing required arguments: id or data");
    }
  }
}
export class DeleteCategoryStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.deleteCategory(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}