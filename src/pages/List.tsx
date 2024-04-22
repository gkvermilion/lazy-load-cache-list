import React from "react";
import { getCatalogs } from "../http/listApi.ts";

type ListState = {
  currentPage: number;
  perPage: 10 | 20 | 50 | 100;
  totalPages: number;
};

type ListItem = {
  ui: string;
  parent: boolean;
  folder: boolean;
  name: string | null;
  id: string;
};

class List extends React.Component<any, ListState> {
  listItems: Array<ListItem> = [];

  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 100,
      totalPages: 0,
    };
  }

  get currentPage(): number {
    return this.state.currentPage;
  }

  set currentPage(page: number) {
    this.setState({ currentPage: page });
  }

  get perPage(): number {
    return this.state.perPage;
  }

  set perPage(perPage: 10 | 20 | 50 | 100) {
    this.setState({ perPage: perPage });
  }

  get totalPages(): number {
    return this.state.totalPages;
  }

  set totalPages(pages: number) {
    this.setState({ totalPages: pages });
  }

  async getItems(): Promise<void> {
    try {
      const response = await getCatalogs(this.currentPage, this.perPage);
      console.log(response);
      this.listItems = response.data;
      this.totalPages = Math.ceil(
        response.headers.get("X-Total-Count") / this.perPage
      );
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  componentDidMount(): void {
    this.getItems().then((response) => {
      let index = this.currentPage + 1;
      setInterval(() => {
        getCatalogs(index, this.perPage);
        index++;
      }, 2000);
    });
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<ListState>,
    snapshot?: any
  ): void {
    if (prevState.currentPage !== this.currentPage) {
      console.log("update");
      this.getItems();
    }
  }

  handlePrevPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }

  render() {
    return (
      <div className="List">
        {this.listItems &&
          this.listItems.map((item: ListItem) => (
            <div key={item.ui}>{item.name}</div>
          ))}

        {this.totalPages && (
          <span style={{ paddingTop: "50px" }}>
            total pages {this.totalPages}
          </span>
        )}

        <button
          onClick={() => this.handlePrevPage()}
          disabled={this.currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => this.handleNextPage()}
          disabled={this.currentPage === this.totalPages}
        >
          Next Page
        </button>
      </div>
    );
  }
}

export default List;
