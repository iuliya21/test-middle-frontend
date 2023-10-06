import { Component } from "react";
import data from "../../data/data.json";
import { connect } from "react-redux";
import { RootState } from "../../services/store";
import styles from "./reviews.module.css";

type TReview = {
  name: string;
  review: string;
  date: string;
};

type TReviewList = {
  [key: string]: {
    [key: string]: TReview;
  };
};

type TReviewListState = {
  reviews: TReviewList;
  currentLanguage: string;
  currentPage: number;
  reviewsPerPage: number;
};

type LanguageSelectorProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => ({
  selectedLanguage: state.language,
});

class Reviews extends Component<LanguageSelectorProps, TReviewListState> {
  state = {
    reviews: data as TReviewList,
    currentLanguage: "ru",
    currentPage: 1,
    reviewsPerPage: 10,
  };

  componentDidUpdate(prevProps: LanguageSelectorProps) {
    if (this.props.selectedLanguage !== prevProps.selectedLanguage) {
      this.setState({
        currentLanguage: this.props.selectedLanguage,
        currentPage: 1,
      });
    }
  }

  handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const pageNumber = Number(e.currentTarget.id);
    this.setState({
      currentPage: pageNumber,
    });
  };

  render() {
    const { reviews, currentLanguage, currentPage, reviewsPerPage } =
      this.state;

    const currentReviews = reviews[currentLanguage];
    if (!currentReviews) return null;

    const reviewsArray = Object.values(currentReviews);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviewsSlice = reviewsArray.slice(
      indexOfFirstReview,
      indexOfLastReview
    );

    const totalPages = Math.ceil(reviewsArray.length / reviewsPerPage);

    const getInitials = (name: string) => {
      const nameParts = name.split(" ");
      if (nameParts.length > 1) {
        return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
      }
      return name;
    };

    const renderReviews = currentReviewsSlice.map((review, index) => (
      <div key={index} className={styles.review}>
        <h3 className={styles.text}>{getInitials(review.name)}</h3>
        <p className={styles.text}>{review.review}</p>
        <p className={styles.text}>{review.date}</p>
      </div>
    ));

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
      <span
        className={number === currentPage ? styles.activePage : styles.page}
        key={number}
        id={number.toString()}
        onClick={(e) => this.handleClick(e)}
      >
        {number}
      </span>
    ));

    const isNextDisabled = currentPage === totalPages;
    const isPrevDisabled = currentPage === 1;

    return (
      <div>
        <div>{renderReviews}</div>
        <div className={styles.pages}>
          <span
            className={styles.page}
            onClick={() =>
              !isPrevDisabled &&
              this.handleClick({
                currentTarget: { id: (currentPage - 1).toString() },
              } as React.MouseEvent<HTMLSpanElement>)
            }
          >
            {"<"}
          </span>
          {renderPageNumbers}
          <span
            className={styles.page}
            onClick={() =>
              !isNextDisabled &&
              this.handleClick({
                currentTarget: { id: (currentPage + 1).toString() },
              } as React.MouseEvent<HTMLSpanElement>)
            }
          >
            {">"}
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Reviews);
