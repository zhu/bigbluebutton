import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { GiftEvent } from '/imports/ui/components/whiteboard/service';

const baseName = Meteor.settings.public.app.basename;

export default class Gift extends Component {
  constructor() {
    super();

    this.state = {
      remain: 0,
    };

    this.handleGift = this.handleGift.bind(this);
  }

  handleGift() {
    this.setState({ remain: 5 });
    setTimeout(() => this.setState({ remain: 0 }), 5000);
  }

  componentDidMount() {
    GiftEvent.on('gift', this.handleGift);
  }

  componentWillUnmount() {
    GiftEvent.off('gift', this.handleGift);
  }

  render() {
    const show = this.state.remain > 0;
    const gift_path = `${baseName}/svgs/bbb_gift.svg`;
    return (
      <div
        hidden={!show}
        style={{
 width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
}}
      >
        <img src={gift_path} alt="gift" style={{ maxWidth: '80%', maxHeight: '80%' }} />
      </div>
    );
  }
}

