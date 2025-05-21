import { KiotVietService } from '../../service/kiotviet_service';
import { ToolStrategy } from '../tool.strategy';

export class GetCustomersStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getCustomers(args);
  }

  validateArgs(args: any): void {
    // Không cần validation đặc biệt
  }
}
export class GetCustomerByIdStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.getCustomerById(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}
export class CreateCustomerStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.createCustomer(args.data);
  }

  validateArgs(args: any): void {
    if (!args.data) {
      throw new Error("Missing required argument: data");
    }
  }
}
export class UpdateCustomerStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.updateCustomer(String(args.id), args.data);
  }

  validateArgs(args: any): void {
    if (!args.id || !args.data) {
      throw new Error("Missing required arguments: id or data");
    }
  }
}
export class DeleteCustomerStrategy implements ToolStrategy {
  async execute(args: any, service: KiotVietService): Promise<any> {
    return await service.deleteCustomer(String(args.id));
  }

  validateArgs(args: any): void {
    if (!args.id) {
      throw new Error("Missing required argument: id");
    }
  }
}
