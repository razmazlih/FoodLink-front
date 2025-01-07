import './TemplateContent.css';

function TemplateContent({ topHeader, mainHeader, paragraph, button }) {

    const buttonTag = button ? <button>{button}</button> : null;

    return (
        <div className="template-content">
            {topHeader}
            {mainHeader}
            {paragraph}
            {buttonTag}
        </div>
    );
}

export default TemplateContent;