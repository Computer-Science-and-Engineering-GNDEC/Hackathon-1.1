package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class calculator extends AppCompatActivity implements View.OnClickListener {

    Button butt,min,mul,div;
    EditText etFirst , etSecond;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calculator);

        butt = findViewById(R.id.butt);
        min = findViewById(R.id.min);
        mul = findViewById(R.id.mul);
        div = findViewById(R.id.div);



        etFirst = findViewById(R.id.etFirst);

        etSecond = findViewById(R.id.etSecond);

        butt.setOnClickListener(this);

        div.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==div){
                    String num3 = etFirst.getText().toString();
                    String num4 = etSecond.getText().toString();

                    int numb = Integer.parseInt(num3);
                    int number2 = Integer.parseInt(num4);

                    String number16 = numb / number2 +"";

                    Toast.makeText(calculator.this, "Division is "+number16, Toast.LENGTH_SHORT).show();
                }
            }
        });
        mul.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==mul){
                    String num3 = etFirst.getText().toString();
                    String num4 = etSecond.getText().toString();

                    int numb = Integer.parseInt(num3);
                    int number2 = Integer.parseInt(num4);

                    String number16 = numb * number2 +"";

                    Toast.makeText(calculator.this, "Multiplication is "+number16, Toast.LENGTH_SHORT).show();
                }
            }
        });


        min.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==min){

                    String num3 = etFirst.getText().toString();
                    String num4 = etSecond.getText().toString();

                    int numb = Integer.parseInt(num3);
                    int number2 = Integer.parseInt(num4);

                    String number16 = numb - number2 +"";

                    Toast.makeText(calculator.this, "substraction is "+number16, Toast.LENGTH_SHORT).show();


                }
            }
        });
    }

    @Override
    public void onClick(View v) {

        if (v==butt) {
            String num1 = etFirst.getText().toString();
            String num2 = etSecond.getText().toString();

            int num = Integer.parseInt(num1);
            int number = Integer.parseInt(num2);

            String number1 = num + number + "";

            Toast.makeText(this, "your sum is " + number1, Toast.LENGTH_SHORT).show();
        }



    }
}