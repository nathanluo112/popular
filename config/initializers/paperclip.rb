# config/initializers/paperclip.rb
Paperclip::Attachment.default_options[:url] = 'bobolinks-popular'
Paperclip::Attachment.default_options[:path] = '/:class/:attachment/:id_partition/:style/:filename'