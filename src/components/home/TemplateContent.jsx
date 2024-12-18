function TemplateContent({ topHeader, mainHeader, paragraph, button }) {

    const buttonTag = button ? <button>{button}</button> : null

    const content = (
        <div>
            {topHeader}
            {mainHeader}
            {paragraph}
            {buttonTag}
        </div>
    )
  return content;
}

export default TemplateContent
