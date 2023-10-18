interface PostBody {
    page?: number;
    resultsPerPage?: number;
    sortBy?: string;
    sortOrder?: number;
    searchKey?: string;
    searchValue?: string;
}

export default PostBody;
