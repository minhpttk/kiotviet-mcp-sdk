import { ToolStrategy } from '../strategies/tool.strategy';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Item Strategy
import * as ProductStrategy from '../strategies/product/product.strategy';
import * as CategoryStrategy from '../strategies/category/category.strategy';
import * as CustomerStrategy from '../strategies/customer/customer.strategy';

// Schema
import * as ProductSchema from '../schemas/product.schema';


interface ToolRegistration {
  strategy: ToolStrategy;
  schema: Tool;
}

export class ToolFactory {
  private static registrations: Map<string, ToolRegistration> = new Map();

  // Khởi tạo tất cả strategies
  static {
    // Product strategies
    ToolFactory.registrations.set('getProducts', {
      strategy: new ProductStrategy.GetProductsStrategy(),
      schema: ProductSchema.getProductsTool,
    });
    ToolFactory.registrations.set('getProductById', {
      strategy: new ProductStrategy.GetProductByIdStrategy(),
      schema: ProductSchema.getProductByIdTool,
    });
    ToolFactory.registrations.set('createProduct', {
      strategy: new ProductStrategy.CreateProductStrategy(),
      schema: ProductSchema.createProductTool,
    });
    ToolFactory.registrations.set('updateProduct', {
      strategy: new ProductStrategy.UpdateProductStrategy(),
      schema: ProductSchema.updateProductTool,
    });
    ToolFactory.registrations.set('deleteProduct', {
      strategy: new ProductStrategy.DeleteProductStrategy(),
      schema: ProductSchema.deleteProductTool,
    });

    // Category strategies

    // Customer strategies

  }

  static getStrategy(toolName: string): ToolStrategy {
    const registration = ToolFactory.registrations.get(toolName);
    if (!registration) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    return registration.strategy;
  }
  static getAllSchemas(): Tool[] {
    return Array.from(ToolFactory.registrations.values()).map(reg => reg.schema);
  }
  
  static getFilteredSchemas(enabledToolsSet?: Set<string>): Tool[] {
    const allSchemas = this.getAllSchemas();
    
    if (!enabledToolsSet || enabledToolsSet.size === 0) {
      return allSchemas;
    }
    
    return allSchemas.filter(schema => enabledToolsSet.has(schema.name));
  }
}