// @flow
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import localPdfFile from '../sample.pdf';
// import homeStyles from './Home.css';

type Props = {};

export default class PdfComponent extends Component {
  props: Props;

  state = {
    numPages: 0,
    pageNumber: 1,
    localPdfBlob: null,
    pdfBlob: null
  };

  async componentDidMount() {
    const url =
      'http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf';
    const pdfBlob = await fetch(url).then(res => res.blob());
    this.setState({
      pdfBlob,
      localPdfBlob: localPdfFile
    });
  }

  increment() {
    const { pageNumber } = this.state;
    const nextPageNumber = pageNumber + 1;
    this.setState({ pageNumber: nextPageNumber });
  }

  decrement() {
    const { pageNumber } = this.state;
    const nextPageNumber = pageNumber - 1;
    this.setState({ pageNumber: nextPageNumber });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages, pdfBlob, localPdfBlob } = this.state;

    return (
      <div>
        <button type="button" onClick={() => this.decrement()}>
          Prev
        </button>
        <button type="button" onClick={() => this.increment()}>
          Next
        </button>
        <Document file={pdfBlob} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page scale={0.2} pageNumber={pageNumber} />
        </Document>
        <Document
          file={localPdfBlob}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page scale={0.2} pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
