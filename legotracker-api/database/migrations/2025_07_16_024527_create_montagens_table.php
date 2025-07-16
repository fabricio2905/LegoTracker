    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('montagens', function (Blueprint $table) {
                $table->id(); 
                $table->string('nome'); 
                $table->text('descricao')->nullable(); 
                $table->string('url_imagem')->nullable(); 
                $table->integer('progresso_atual')->default(0); 
                $table->integer('progresso_total'); 
                $table->string('status')->default('Pendente'); 
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('montagens');
        }
    };
    