<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Service extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
    $name = $this->argument('name'); // Get the service class name

    $path = app_path("Services/{$name}.php"); // Target path

    if (file_exists($path)) {
        $this->error("Service {$name} already exists!");
        return;
    }

    // Ensure the Services directory exists
    if (!is_dir(app_path('Services'))) {
        mkdir(app_path('Services'), 0755, true);
    }

    // Create the service file with a basic template
    $template = "<?php

    namespace App\Services;

    class {$name}
    {
        //
    }
    ";

        file_put_contents($path, $template);

        $this->info("Service {$name} created successfully at {$path}");
    }

}
