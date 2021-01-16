import { RequestPart } from "./RequestPart";

export class RequestPartBuilder {
   constructor(part) {
      this.part = part;
      this.dimensions = [];
      this.metrics = [];
      this.sorts = [];
   }

   withPart(part) {
      this.part = part;
      return this;
   }

   withDateStart(dateStart) {
      this.dateStart = dateStart;
      return this;
   }

   withDateEnd(dateEnd) {
      this.dateEnd = dateEnd;
      return this;
   }

   withDimension(dimension) {
      this.dimensions.push(dimension);
      return this;
   }

   withMetric(metric) {
      this.metrics.push(metric);
      return this;
   }

   ascending(key) {
      this.sorts.push({ ascending: true, key: key });
      return this;
   }

   build() {
      return new RequestPart(this.part, this.dateStart, this.dateEnd, this.dimensions, this.metrics, this.sorts);
   }
}
