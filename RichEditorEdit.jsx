import React, { PropTypes } from 'react';
import { Form } from "antd";
import RichEditor from "./RichEditor.jsx"

export default class RichEditorEdit extends React.Component {

    handleAddNewTask = (e) => {
        e.preventDefault();
        let form = this.props.form;
        let fromValue = form.getFieldsValue();
        console.log("fromValue", fromValue);
        form.validateFieldsAndScroll((errors, values)=> {
            if (!errors) {
                this.props.submit(fromValue);
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 12},
        };
        return (
            <div >
                <Form style={{ maxWidth: 1200 }} onSubmit={this.handleAddNewTask}>
                    <RichEditor
                        form={this.props.form}// from parentComponent get form
                        label="XXXX"
                        eleId="eleName"
                        formItemLayout={formItemLayout}
                        initRichEditorValue={""} //initialValue get from database's clob field
                        required={true}
                        toolbarOnFocus={true}
                        readOnly={false}
                        placeholder="please input XXX"
                        eleType="edit"//controlle by formItem and with css
                    />
                </Form>
            </div>
        );
    }
}
