export class SingletonAcquireVsCodeService {
  private static instance = acquireVsCodeApi();

  public static getInstance(): ReturnType<typeof acquireVsCodeApi> {
    return SingletonAcquireVsCodeService.instance;
  }
}
