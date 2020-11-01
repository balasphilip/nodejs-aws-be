import { ProductsService } from "@src/services/products";
import products from "@src/services/productsList.json";

describe("products service", () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it("should return products list", async () => {
    const result = await service.getProductsList();
    const expected = products;

    expect(result).toEqual(expected);
  });

  it("should return product by its id", async () => {
    const firstTwoIds = products.slice(0, 2).map(({ id }) => id);

    const first = await service.getProductById(firstTwoIds[0]);
    const second = await service.getProductById(firstTwoIds[1]);

    expect(first.id).toEqual(firstTwoIds[0]);
    expect(second.id).toEqual(firstTwoIds[1]);
  });

  it("should throw if product id is missed", async () => {
    await expect(service.getProductById(null)).rejects.toThrow();
  });

  it("should throw if product id is not exist", async () => {
    await expect(service.getProductById("123")).rejects.toThrow();
  });
});
