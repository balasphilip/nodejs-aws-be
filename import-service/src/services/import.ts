import { S3 } from "aws-sdk";
import { S3EventRecord } from "aws-lambda";
import { Controller, Get, Query, Response, Route } from "tsoa";
import csv from "csv-parser";

import "source-map-support/register";

@Route("import")
export class ImportService extends Controller {
  public static BUCKET = "balasphilipawscourseapp-import-service";
  public static BUCKET_PREFIX = "uploaded/";

  constructor(private readonly s3: S3) {
    super();
  }

  @Get()
  @Response(400, "FileName is missed")
  @Response(500, "Error when saving file to S3")
  async generateClientUrlToSaveFile(
    @Query("name") fileName: string
  ): Promise<string> {
    if (!fileName) {
      throw new Error("ApplicationError: FileName is missed!");
    }

    const parameters = {
      Bucket: ImportService.BUCKET,
      Key: ImportService.BUCKET_PREFIX + fileName,
      Expires: 60,
      ContentType: "text/csv",
    };

    try {
      // Generate pre-signed URL to upload a file
      const url = await this.s3.getSignedUrlPromise("putObject", parameters);

      return url;
    } catch (error) {
      console.log(
        "ImportService error when saving file to S3",
        fileName,
        error
      );

      throw error;
    }
  }

  parseFile(records: S3EventRecord[]) {
    return Promise.all(
      records.map((record) => {
        const srcKey = decodeURIComponent(
          record.s3.object.key.replace(/\+/g, " ")
        );

        console.log("ImportService: start parsing file: ", srcKey);

        return new Promise((resolve, reject) => {
          this.s3
            .getObject({
              Bucket: ImportService.BUCKET,
              Key: srcKey,
            })
            .createReadStream()
            .pipe(csv())
            .on("data", (data) =>
              console.log("ImportService: parsing file, row: ", data)
            )
            .on("end", async () => {
              console.log("ImportService: parsing file completed");

              resolve();
            })
            .on("error", (error) => {
              console.log(
                `ImportService: parsing file: ${srcKey} error`,
                error
              );

              reject(error);
            });
        });
      })
    );
  }
}
