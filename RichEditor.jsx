import React, { PropTypes } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form ,Input} from "antd";
import { convertFromHTML, ContentState,convertToRaw,EditorState} from 'draft-js';
import _ from 'lodash';
import deepEqual from '../../common/deepEqual';
import draftToHtml from 'draftjs-to-html';
import '../../less/XyzRichEditor.less';


const FormItem = Form.Item;

export default class RichEditor extends React.Component {

    onEditorChange(editorContent) {
        this.setInputFieldValue(editorContent);
    };

    //设置隐藏域值
    setInputFieldValue = (value)=> {
        const id = this.props.eleId;
        let a = {};
        a[id] = JSON.stringify(value);
        this.props.form.setFieldsValue(a);
    };

    componentWillMount() {
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const propsName = ['initRichEditorValue'];
        if (!deepEqual(this.props, nextProps, propsName)) {
            this.prepareData(nextProps)
        }
    }

    prepareData = (props) => {
        const {initRichEditorValue,eleType} = props;
        let editorContent = (typeof initRichEditorValue != "undefined" ? JSON.parse(initRichEditorValue) : "");
        if(eleType =="edit"){
            this.setInputFieldValue(editorContent);
        }
        this.setState({
            editorContent: editorContent,
        });
    };

    buildEdit = ()=> {
        const { getFieldDecorator } = this.props.form;
        const { required ,label,formItemLayout,eleId,readOnly,toolbarOnFocus,placeholder } = this.props;
        const { editorContent } = this.state;
        //console.log("editorContenteditorContenteditorContent", editorContent);
        return (
            <div >
                <FormItem {...formItemLayout} label={label} required={required}>
                    {
                        getFieldDecorator(eleId, {
                            rules: [
                                {
                                    validator(rule, value, callback, source, options){
                                        let errors = [];
                                        if (required && _.isEmpty(value)) {
                                            errors.push({message: `请输入${label}`});
                                            callback(errors);
                                        } else {
                                            callback(errors);
                                            return;
                                        }
                                    }
                                }

                            ],

                        })(
                            <Input type="hidden"/>
                        )
                    }
                    <Editor
                        toolbarClassName="home-toolbar"
                        wrapperClassName="home-wrapper-line"
                        editorClassName="home-editor"
                        onChange={this.onEditorChange.bind(this)}
                        contentState={editorContent}
                        toolbarOnFocus={toolbarOnFocus}
                        readOnly={readOnly}
                        placeholder={placeholder}
                    />
                </FormItem>
            </div>
        );
    };

    buildView = ()=> {
        const { readOnly,toolbarOnFocus } = this.props;
        const { editorContent } = this.state;
        console.log("editorContenteditorContenteditorContent", editorContent);
        return (
            <div>
                <Editor
                    toolbarClassName="home-toolbar"
                    wrapperClassName="home-wrapper"
                    editorClassName="home-editor"
                    contentState={editorContent}
                    toolbarOnFocus={toolbarOnFocus}
                    readOnly={readOnly}
                />
            </div>
        );
    };

    buildComponents = ()=> {
        const {eleType} = this.props;
        switch (eleType.toLowerCase()) {
            case "edit":
                return this.buildEdit();
            case "view":
                return this.buildView();
        }
    };

    render() {
        const items = this.buildComponents();
        return (
            <div>
                {items}
            </div>
        );
    }
}
