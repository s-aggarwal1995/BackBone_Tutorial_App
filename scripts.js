// Backbone Model

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: '',
    }
});

// Backbone Collection
// Collection Is Array Of Models

var Blogs = Backbone.Collection.extend({});

// instantiate two Blogs

var blog1 = new Blog({
    author: 'Micheal',
    title: 'Micheal\'s Blog',
    url: 'http://michealblog.com'
});

var blog2 = new Blog({
    author: 'Sanchit',
    title: 'Sanchit\'s Blog',
    url: 'http://Sanchitblog.com'
});

// instantiate a collection
//var blogs = new Blogs([blog1,blog2]);
var blogs = new Blogs();

//backbone views
// implement model and collections in our views

// backbone view for one blog

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blogs-list-template').html());
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel-blog': 'cancel',
        'click .delete-blog': 'delete'
    },
    edit: function () {
        this.$('.edit-blog').hide();
        this.$('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel-blog').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
        this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');

    },
    update: function () {
        this.model.set("author", $('.author-update').val());
        this.model.set("title", $('.title-update').val());
        this.model.set("url", $('.url-update').val());
    },
    cancel: function () {
        this.render();
    },
    delete: function () {
        this.model.destroy();
    },
    render: function () {
        this.$el.html(this.template({ model: this.model.toJSON() }));
        return this;
    }

});

// backbone view for all blogs

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function () {
        self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function () {
            setTimeout(function () {
                self.render();
            }, 30);
        }, this);
        this.model.on('destroy', this.render, this);

    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        //return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function () {
    $('.add-blog').on('click', function () {
        if ($('.author-input').val() == "" || $('.title-input').val()=="" || $('.url-input').val()=="") {
            alert("please enter all the fields");
        }
        else {
            var blog = new Blog({
                author: $('.author-input').val(),
                title: $('.title-input').val(),
                url: $('.url-input').val()
            });

            $('.author-input').val('');
            $('.title-input').val('');
            $('.url-input').val('');

            blogs.add(blog);
        }
    })
})


