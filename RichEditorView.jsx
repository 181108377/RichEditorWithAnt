import React, { PropTypes } from 'react';
import { Row, Col, Form,Button } from 'antd';
import RichEditor from "./RichEditor.jsx"

export default class RichEditorView extends React.Component {

    render() {
        const rowStyle = {
            align: "middle",
            justify: "center"
        };
        const colTitle = {
            span: 2,
            push: 1
        };
        const colContent = {
            span: 10,
            push: 1
        };
        return (
            <div >
                <Row {...rowStyle} >
                    <Col {...colTitle}>
                        <div className="div_in_form">EditText:</div>
                    </Col>
                    <Col {...colContent}>{<RichEditor
                        initRichEditorValue={""}//editorText
                        toolbarOnFocus={true}
                        readOnly={true}
                        eleType="view"//no css with component :RichEditor
                    />}</Col>
                </Row>
            </div>
        );
    }
}
