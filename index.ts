class MinMaxScaler {
  private X_min = 0;
  private X_max = 0;
  private min_ = 0;
  private max_ = 1;

  private params = {
    X_max: this.X_max,
    X_min: this.X_min,
    max_: this.max_,
    min_: this.min_,
  };

  private writeParams(): void {
    this.params = {
      X_max: this.X_max,
      X_min: this.X_min,
      max_: this.max_,
      min_: this.min_,
    };
  }

  private fit(X: number[], min = 0, max = 1): number[] {
    this.X_max = Math.max(...X);
    this.X_min = Math.min(...X);
    this.min_ = min;
    this.max_ = max;

    const X_minArr = X.map((values) => values - this.X_min);
    const X_std = X_minArr.map((values) => values / (this.X_max - this.X_min));
    const X_scaled = X_std.map((values) => values * (max - min) + min);

    return X_scaled;
  }

  public fitTransform(data: number[], min = 0, max = 1): number[] {
    const trainScaled = this.fit(data, min, max);
    this.writeParams();

    return trainScaled;
  }

  public transform(result: number[]): number[] {
    const fit = this.params;

    const X_minArr = result.map((values) => values - fit.X_min);
    const X_std = X_minArr.map((values) => values / (fit.X_max - fit.X_min));
    const X_scaled = X_std.map((values) => values * (fit.max_ - fit.min_) + fit.min_);

    return X_scaled;
  }

  public inverseTransform(input: number[], min = 0, max = 1): number[] {
    const fit = this.params;

    const X = input.map((values) => (values - min) / (max - min));
    const X_ = X.map((values) => values * (fit.X_max - fit.X_min) + fit.X_min);

    return X_;
  }

  public getParams(): any {
    return this.params;
  }
}

export default MinMaxScaler;