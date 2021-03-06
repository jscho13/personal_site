Rails.application.config.after_initialize do
  Rails.logger = ActiveSupport::TaggedLogging.new(ActiveSupport::Logger.new(STDOUT))
  begin
    # make a spot for the site
    dest = Rails.root.join('public/blog')
    # generate the site
    Jekyll::Site.new(
      Jekyll.configuration({
        "config" => Rails.root.join('config', 'blog.yml').to_s,
        "source" => Rails.root.join('blog').to_s,
        "destination" => dest.to_s
      })
    ).process
    # FileUtils.cp_r('public/blog/.', 'public/')
    # FileUtils.rm_r('public/blog/')
    # the strange codes give the output color
    Rails.logger.info "\e[0;32;49mJekyll site built!\e[0m]]"
  rescue => e
    Rails.logger.error "\e[0;31;49mJekyll site build failed.\e[0m\n\e[0;33;49mError:\e[0m #{e}"
  end
end
