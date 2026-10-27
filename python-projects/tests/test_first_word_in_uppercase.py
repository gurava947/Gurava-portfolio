import unittest

from support import run_solution


class FirstWordInUppercaseTest(unittest.TestCase):
    def test_case_01_hello_world(self):
        """hello world."""
        result = run_solution('first-word-in-uppercase', 'hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HELLO world\n')

    def test_case_02_python(self):
        """python."""
        result = run_solution('first-word-in-uppercase', 'python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'PYTHON\n')


if __name__ == "__main__":
    unittest.main()
