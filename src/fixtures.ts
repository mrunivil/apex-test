import { faker } from '@faker-js/faker';

const STUDIOS = new Array(10)
  .fill(undefined)
  .map((_) => faker.company.companyName());

export type WireEntity = {
  title?: string;
  startingDate?: Date;
  endingDate?: Date;
  isStudio?: boolean;
  sinkLabel?: string;
};

export const fixtures = new Array<WireEntity>(5)
  .fill({})
  .map((_: WireEntity) => {
    const minDate = faker.date.recent(1);
    const maxDate = faker.date.between(minDate, faker.date.soon(1, minDate));
    return {
      title: faker.commerce.productName(),
      startingDate: minDate,
      endingDate: maxDate,
      isStudio: faker.datatype.boolean(),
      sinkLabel:
        STUDIOS[faker.datatype.number({ min: 0, max: STUDIOS.length - 1 })],
    } as WireEntity;
  });
