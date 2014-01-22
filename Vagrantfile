# -*- mode: ruby -*-
# vi: set ft=ruby :

require "yaml"

_config = YAML.load(File.open(File.join(File.dirname(__FILE__), "/yaml/vagrantconfig.yaml"), File::RDONLY).read)

CONF = _config

Vagrant::Config.run do |config|
	config.vm.define :appserver do |appserver|
    appserver.vm.box = "ubuntu_precise64"
		appserver.vm.box_url = "http://files.vagrantup.com/precise64.box"
    appserver.vm.network :hostonly, "10.0.0.200"

		# This allows symlinks to be created within the /vagrant root directory,
  		# which is something librarian-puppet needs to be able to do. This might
  		# be enabled by default depending on what version of VirtualBox is used.
  		appserver.vm.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]

		# This shell provisioner installs librarian-puppet and runs it to install
  		# puppet modules. This has to be done before the puppet provisioning so that
  		# the modules are available when puppet tries to parse its manifests.
		# must pass in directory of the Puppetfile location
		appserver.vm.provision :shell, :path => "shell/prereqs.sh", :args => "puppet/librarian/appserver"

		# Now run the puppet provisioner. Note that the modules directory is entirely
		# managed by librarian-puppet
    		appserver.vm.provision :puppet do |appserver_puppet|
    			appserver_puppet.manifests_path = "puppet/manifests"
    			appserver_puppet.manifest_file  = "appserver.pp"
		end
		# define the name of your application here within the args e.g replace "mytestapp" with your app name
		appserver.vm.provision :shell, :path => "shell/kickstart-app.sh",:args => "mytestapp"

  	end
end
