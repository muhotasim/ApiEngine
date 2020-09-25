import React, { Fragment } from 'react';
import { uuid } from '../Common.Comp';

class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
    this._goPrevOrNext = this._goPrevOrNext.bind(this);
  }

  _goPrevOrNext(t, v = null) {
    const _this = this,
      curPage = this.state.currentPage;
    if (t == 'prev') {
      if (curPage > 0) _this.setState({ currentPage: curPage - 1 });
      _this.props._onParamsChange(curPage - 1, 'page');
    } else if (t == 'next') {
      if (curPage + 1 < _this.props.pageCount)
        _this.setState({ currentPage: curPage + 1 });
      _this.props._onParamsChange(curPage + 1, 'page');
    } else {
      _this.setState({ currentPage: v });
      _this.props._onParamsChange(v, 'page');
    }
  }

  render() {
    const { pageCount, _onParamsChange } = this.props;
    const _this = this;
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(i);
    }
    const cl = pages.length ? '' : 'disabled';
    let key = uuid();
    return (
      <Fragment>
        <ul className={'pagination pagination-sm float-right ' + cl}>
          <li className="page-item">
            <button
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                _this._goPrevOrNext('prev');
              }}
            >
              Prev
            </button>
          </li>
          {pages.length ? (
            pages.map((v, itemIndex) => {
              let active = _this.state.currentPage == v ? 'active' : '';
              return (
                <li key={key + itemIndex} className={'page-item ' + active}>
                  <a
                    className={'page-link '}
                    onClick={(e) => {
                      e.preventDefault();
                      _this._goPrevOrNext('', v);
                    }}
                  >
                    {v + 1}
                  </a>
                </li>
              );
            })
          ) : (
            <li className="page-item">
              <a className={'page-link '}>...</a>
            </li>
          )}

          <li className={'page-item '}>
            <button
              disabled={_this.state.currentPage + 1 == pages.length}
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                _this._goPrevOrNext('next');
              }}
            >
              Next
            </button>
          </li>
        </ul>
        <p className="clearfix"></p>
      </Fragment>
    );
  }
}

export default Pager;
