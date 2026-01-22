import mongoose from "mongoose";

export class ConnectionDB {
  private uri: string;
  constructor(uri: string) {
    this.uri = uri;
  }
  public async connectDB() {
    await mongoose.connect(this.uri).then(() => {
      console.log("DB Connected");
    });
  }
}
