import React from 'react';
export const uuid = () => {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const Header = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.descriptions}</p>
    </div>
  );
};

export class PopUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.PopUpId = uuid();

    ['close'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }
  close() {
    this.props.onClose();
  }
  componentDidMount() {
    const _this = this;
    $('#' + this.PopUpId).css('padding-right', '0');

    $('#' + this.PopUpId).on('hidden.bs.modal', function () {
      $('#' + this.PopUpId).css('padding-right', '0');
      $('#' + this.PopUpId).css('padding-left', '0');
      _this.close();
    });
  }
  componentWillUnmount() {
    $('#' + this.PopUpId).modal('hide');
    $('#' + this.PopUpId).off('hidden.bs.modal', function () {
      $('#' + this.PopUpId).css('padding-right', '0');
      $('#' + this.PopUpId).css('padding-left', '0');
    });
    this.close();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.show) {
      $('#' + this.PopUpId).modal('show');
      $('#' + this.PopUpId).css('padding-right', '0');
      // $("#"+this.PopUpId).css("margin-right","15px");
    } else if (newProps.show == false) {
      $('#' + this.PopUpId).modal('hide');
    }
  }

  render() {
    return (
      <div>
        <div className="modal" id={this.PopUpId}>
          <div className="modal-dialog">
            <div className="modal-content">
              {this.props.title ? (
                <div className="modal-header">
                  <h3 className="modal-title">
                    {this.props.title}
                    <span
                      className="close pull-right"
                      style={
                        this.props.closeBtnStyle ? this.props.closeBtnStyle : {}
                      }
                      onClick={this.close}
                    >
                      <span aria-hidden="true">&times;</span>
                    </span>
                  </h3>
                </div>
              ) : null}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
