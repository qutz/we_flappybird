const wxBird = require( '../../lib/wxbird.js' );

Page( {
    data: {
        modalHidden: true,
        score: '0'
    },
    onLoad: function( options ) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {
        // 页面渲染完成
    },
    onTouchStart( { touches }) {
        const { clientX, clientY } = touches[ 0 ];
        this.movements = [ [ clientX, clientY ], [ 0, 0 ] ];
    },

    onTouchMove( { touches }) {
        const { clientX, clientY } = touches[ 0 ];

        this.movements[ 1 ] = [ clientX, clientY ];
    },

    onTouchEnd() {
        var x = this.movements[ 1 ][ 0 ] - this.movements[ 0 ][ 0 ];
        var y = this.movements[ 1 ][ 1 ] - this.movements[ 0 ][ 1 ];
        if( ( Math.abs( x ) < Math.abs( y ) ) && y < 0 ) {
            this.bird.keyup();
        }
    },
    startGame: function() {
        const bird = this.bird
        this.setData( { score: 0, modalHidden: true });
        bird.startGame();
    },
    onShow: function() {
        const bird = this.bird = new wxBird(
            {
                ctx: wx.createContext(),
                id: 'birdId',
                height: 620,
                width: 375,
            }
        );
        bird.on( 'over', packet => {
            this.setData( { score: packet.score, modalHidden: false });
        });
        bird.startGame();
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})