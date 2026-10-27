import unittest

from support import run_solution


class FirstWordTest(unittest.TestCase):
    def test_case_01_hello_world(self):
        """hello world."""
        result = run_solution('first-word', 'hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hello\n')

    def test_case_02_python(self):
        """python."""
        result = run_solution('first-word', 'python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'python\n')


if __name__ == "__main__":
    unittest.main()
