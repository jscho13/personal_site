
BEFORE:

require 'nokogiri'
require 'rb-readline'
require 'pry'

def parse_this(html)
  doc = Nokogiri::HTML("<html><body><div>" + html + "</div></body></html>")

  doc.search("p,img,table,svg").each {|n|
    n[:style] = resize_img(n)
    puts n[:style]
  }
end

def resize_img(n)
  if (n[:width] && n[:height])
    width = n[:width]
    height = n[:height]
  elsif (n[:style] && n[:style][/width:(.*?)px;/m] && n[:style][/height:(.*?)px;/m])
    width = n[:style][/width:(.*?)px;/m, 1]
    height = n[:style][/height:(.*?)px;/m, 1]
  end

  return '' if height.nil? && width.nil?
  
  width = width.to_f
  height = height.to_f

  if width > 800
    width, height = resize_dimensions(width, height)
    n[:style] = (n[:style] || '') + " max-width: #{width}; max-height: #{height};"
  else
    n[:style]
  end

end

def resize_dimensions(width, height)
  aspect_ratio = height/width
  new_height = (600 * aspect_ratio).to_i.to_s + 'px'
  ['600px', new_height]
end

html_string1 = '<img style="width:1000px; height:500px;">'
html_string2 = '<img style="width: 1000px; height: 500px;">'
html_string3 = '<img height="900px" width="1000px">'
html_string4 = '<img style="background-color: red;">'
html_string5 = '<img>'

puts "Connected:"
parse_this(html_string1)
puts "\nDisconnected:"
parse_this(html_string2)
puts "\nHeight width:"
parse_this(html_string3)
puts "\nBackground-color:"
parse_this(html_string4)
puts "\nLiterally Nothing:"
parse_this(html_string5)



AFTER:

module DimensionConstraints

   def self.limit_to_img_width(n, max_width)
    width, height = find_dimensions(n)

     if width > max_width
      new_width, new_height = scale_to_width(width, height, max_width)
      n[:style] =  "max-width: #{new_width}px; max-height: #{new_height}px; " + (n[:style] || '')
    end

     n[:style]
  end

   def self.find_dimensions(n)
    w_reg = /width:(.*?)px/m
    h_reg = /height:(.*?)px/m

     width, height =
      if (n[:width] && n[:height])
        [n[:width], n[:height]]
      elsif (n[:style] && n[:style][w_reg] && n[:style][h_reg])
        [n[:style][w_reg, 1], n[:style][h_reg, 1]]
      else
        [nil, nil]
      end

     return [width.to_i, height.to_i]

   end

   def self.scale_to_width(width, height, new_width)
    aspect_ratio = height.to_f/width.to_f
    new_height = (new_width * aspect_ratio).to_i
    [new_width, new_height]
  end

   def self.limit_to_width(n, max_width)
    "max-width:#{max_width}px;" + (n[:style] || '')
  end

 end

 if __FILE__ == $0
  require 'minitest/autorun'
  require 'nokogiri'

   class DimensionConstraintsTests < MiniTest::Test
    def setup
      @actual = ''
    end

     def resize_first_img_or_svg_in_html(html_frag)
      doc = Nokogiri::HTML(html_frag)
      doc.search("img,svg").each { |n|
        n[:style] = DimensionConstraints.limit_to_img_width(n, 700)
        return n[:style]
      }
    end

     def test_basic
      @actual = resize_first_img_or_svg_in_html('<img style="width:1000px; height:500px;">')
      expected = 'max-width: 700px; max-height: 350px; width:1000px; height:500px;'
      assert_equal expected, @actual
    end

     def test_attr
      @actual = resize_first_img_or_svg_in_html('<img width=1000 height=500">')
      expected = 'max-width: 700px; max-height: 350px; '
      assert_equal expected, @actual
    end

     def test_preserve
      @actual = resize_first_img_or_svg_in_html('<img style="background-color:red">')
      expected = 'background-color:red'
      assert_equal expected, @actual
    end

     def test_noop
      @actual = resize_first_img_or_svg_in_html('<img>')
      expected = ''
      assert_equal expected, @actual
    end
  end
end


