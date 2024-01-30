import './index.css'

const TagsListItem = props => {
  const {tagDetails, onClickTagBtn, isActiveCategory} = props
  const {displayText, optionId} = tagDetails
  const classBtn =
    displayText === isActiveCategory ? 'tag-button active-btn' : 'tag-button'
  const onClickBtn = () => {
    onClickTagBtn(displayText)
  }

  return (
    <li className="list-item">
      <button className={classBtn} onClick={onClickBtn} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default TagsListItem
