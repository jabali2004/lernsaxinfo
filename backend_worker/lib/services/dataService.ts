import {
  createTableService,
  services,
  ServiceResponse,
  TableQuery
} from 'azure-storage';

type TableService = services.table.TableService;
type RequestOptions = services.table.TableService.TableEntityRequestOptions;

export interface IEntity {
  PartitionKey: string;
  RowKey: string;
}

interface IDataService {
  createTableIfNotExists(): Promise<string>;
  insertEntity(
    entity: IEntity,
    config: RequestOptions
  ): Promise<ServiceResponse>;
  updateEntity(entity: IEntity): Promise<ServiceResponse>;
  removeEntity(entity: IEntity): Promise<ServiceResponse>;
  getEntity(partitionKey: string, rowKey: string): Promise<ServiceResponse>;
  listEntities(query: TableQuery): Promise<ServiceResponse>;
}

class DataService implements IDataService {
  private tableService: TableService;
  constructor(private tableName: string) {
    this.tableName = tableName;
    this.tableService = createTableService();
  }

  createTableIfNotExists(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.tableService.createTableIfNotExists(this.tableName, (error) => {
        if (!error) {
          resolve(this.tableName);
        } else {
          reject(error);
        }
      });
    });
  }

  insertEntity(
    entity: IEntity,
    config: RequestOptions
  ): Promise<ServiceResponse> {
    return new Promise(async (resolve, reject) => {
      await this.createTableIfNotExists();
      this.tableService.insertEntity(
        this.tableName,
        entity,
        config,
        (error, _, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  updateEntity(entity: IEntity): Promise<ServiceResponse> {
    return new Promise(async (resolve, reject) => {
      await this.createTableIfNotExists();
      this.tableService.replaceEntity(
        this.tableName,
        entity,
        (error, _, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  removeEntity(entity: IEntity): Promise<ServiceResponse> {
    return new Promise(async (resolve, reject) => {
      await this.createTableIfNotExists();
      this.tableService.deleteEntity(
        this.tableName,
        entity,
        null,
        (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  getEntity(partitionKey: string, rowKey: string): Promise<ServiceResponse> {
    return new Promise(async (resolve, reject) => {
      await this.createTableIfNotExists();
      this.tableService.retrieveEntity(
        this.tableName,
        partitionKey,
        rowKey,
        (error, _, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  listEntities(query: TableQuery): Promise<ServiceResponse> {
    return new Promise(async (resolve, reject) => {
      await this.createTableIfNotExists();
      this.tableService.queryEntities(
        this.tableName,
        query,
        null,
        (error, _, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}

// TODO: Remove / Save as snippet because CosmosDB is currently used
export default DataService;
