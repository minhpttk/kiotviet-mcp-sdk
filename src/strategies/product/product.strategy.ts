import { KiotVietService } from '../../service/kiotviet_service';
import { ToolStrategy } from '../tool.strategy';

export class GetProductsStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getProducts(args);
  }

  validateArgs(args: any): void {
    // Không cần validation đặc biệt
  }
}

export class GetProductByIdStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getProductById(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}

export class CreateProductStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.createProduct(args.data);
  }

  validateArgs(args: any): void {
    if (!args.data) {
      throw new Error("Missing required argument: data");
    }
  }
}
export class UpdateProductStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.updateProduct(String(args.id), args.data);
  }

  validateArgs(args: any): void {
    if (!args.id || !args.data) {
      throw new Error("Missing required arguments: id or data");
    }
  }
}
export class DeleteProductStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.deleteProduct(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}