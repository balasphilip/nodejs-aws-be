import { Connection, EntityManager } from "typeorm";
import { ProductRepository } from "@src/dal/product/repository";
import { ProductsService } from "@src/services/products";

describe("products service", () => {
  let service: ProductsService;
  let productRepository: ProductRepository;
  let transactionalEntityManager: EntityManager;
  let connection: Connection;

  const stock1 = {
    id: 1,
    count: 3,
    // eslint-disable-next-line @typescript-eslint/camelcase
    product_id: "1",
  };

  const stock2 = {
    id: 2,
    count: 5,
    // eslint-disable-next-line @typescript-eslint/camelcase
    product_id: "2",
  };

  const product1 = {
    id: "1",
    title: "test1",
    description: "test1",
    price: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: stock1,
  };

  const product2 = {
    id: "2",
    title: "test2",
    description: "test2",
    price: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: stock2,
  };

  beforeEach(() => {
    productRepository = ({
      find: jest.fn().mockResolvedValue([
        { ...product1, stock: { ...stock1 } },
        { ...product2, stock: { ...stock2 } },
      ]),
      findOne: jest
        .fn()
        .mockResolvedValue({ ...product1, stock: { ...stock1 } }),
    } as unknown) as ProductRepository;

    transactionalEntityManager = ({
      find: jest.fn().mockResolvedValue([
        { ...product1, stock: { ...stock1 } },
        { ...product2, stock: { ...stock2 } },
      ]),
      findOne: jest
        .fn()
        .mockResolvedValue({ ...product1, stock: { ...stock1 } }),
      save: jest.fn(),
    } as unknown) as EntityManager;

    connection = ({
      transaction: (cb) => cb(transactionalEntityManager),
    } as unknown) as Connection;

    service = new ProductsService(connection, productRepository);
  });

  it("should return products list", async () => {
    const result = await service.getProductsList();
    const expected = [
      { ...product1, stock: { ...stock1 } },
      { ...product2, stock: { ...stock2 } },
    ].map(ProductsService.toDTO);

    expect(result).toEqual(expected);
  });

  it("should return product by its id", async () => {
    const first = await service.getProductById(product1.id);

    expect(first).toEqual(
      ProductsService.toDTO({ ...product1, stock: { ...stock1 } })
    );
  });

  it("should throw if product id is missed", async () => {
    await expect(service.getProductById(null)).rejects.toThrow();
  });

  it("should throw if product id is not exist", async () => {
    // eslint-disable-next-line jest/prefer-spy-on
    productRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.getProductById("123")).rejects.toThrow();
  });
});
