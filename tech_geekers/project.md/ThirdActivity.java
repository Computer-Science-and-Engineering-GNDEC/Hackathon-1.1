package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ThirdActivity extends AppCompatActivity implements View.OnClickListener {
    Button btn1 , btn2 , btn3 , btn4,tech;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_third);
        btn1 = findViewById(R.id.btn1);
        btn2 = findViewById(R.id.btn2);
        btn3 = findViewById(R.id.btn3);
        btn4 = findViewById(R.id.btn4);
        tech = findViewById(R.id.tech);

        btn1.setOnClickListener( this);
        btn2.setOnClickListener( this);
        btn3.setOnClickListener( this);
        btn4.setOnClickListener( this);
        tech.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        if(v==btn1) {
            Intent intent = new Intent(this, vivek_dhiman.class);
            startActivity(intent);
        }
        if(v==btn2){
            Intent intent2 = new Intent(this,vanshika_chaudhary.class);
            startActivity(intent2);

        }

        if(v==btn3)
        {
            Intent intent3 = new Intent(this,deepak_kumar.class);
            startActivity(intent3);
        }
        if(v==btn4){

            Intent intent4 = new Intent(this,dalip_kumar.class);
            startActivity(intent4);
        }
        if(v==tech){
            Intent intent5 = new Intent(this,web.class);
            startActivity(intent5);
        }

    }


}

