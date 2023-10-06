import { ChangeEvent, Component } from "react";
import styles from "./lang-selector.module.css";
import { RootState } from "../../services/store";
import { setLanguage } from "../../services/action";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  selectedLanguage: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

type LanguageSelectorProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class LanguageSelector extends Component<LanguageSelectorProps> {

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    this.props.setLanguage(selectedLanguage);
  };

  render() {
    return (
      <div className={styles.selectContainer}>
        <label htmlFor="languageSelect">Язык приложения</label>
        <select
          id="languageSelect"
          value={this.props.selectedLanguage}
          onChange={this.handleChange}
          className={styles.select}
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);