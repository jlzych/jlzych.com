xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title data.site.site_name
  xml.subtitle "Jeff is a product design leader, coder, writer, and letterer. He writes about design, books, technology, creativity, and any other topics that interest him."
  xml.id ( data.site.domain + "/" )
  xml.link "href" => ( data.site.domain + "/" )
  xml.link "href" => ( data.site.domain + "/feed.xml" ), "rel" => "self"
  xml.updated blog.articles.first.date.to_time.iso8601
  xml.author { xml.name "Jeff Zych" }

  blog.articles[0..5].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => ( data.site.domain + article.url )
      xml.id ( data.site.domain + article.url )
      xml.published article.date.to_time.iso8601
      xml.updated article.date.to_time.iso8601
      xml.author { xml.name "Jeff Zych" }
      # xml.summary article.summary, "type" => "html"
      xml.content article.body, "type" => "html"
    end
  end
end
